<?php

namespace controllers\auth\github_server;

use Core\facades\Auth;
use Core\facades\FeatureFlags;
use Core\input_validation\ObjectFieldValidation;
use Core\input_validation\UrlValidation;
use League\Route\Http\Exception\BadRequestException;

class createGithubServerApplication implements \controllers\controllerInterface {

    public function __construct(
        private \App\repositories\github_server\githubServerApplications $githubServerApplicationsRepo,
        private \App\repositories\scm_integrations\RelGroupScmOrg $relGroupScmOrgRepo,
    ) {
    }

	public function handleRequest($request, $args, $response) {
        $post_vars = $request->jsonBody;

        $this->assertCanCreateGithubServerApplication();
        $this->assertAccountIsEligibleForConversion();

        $base_url = ObjectFieldValidation::assertFieldOnObjectIsUrl($post_vars, "base_url");
        $require_broker = $post_vars["require_broker"] ?? false;

        if (str_ends_with($base_url, "/")) {
            $base_url = rtrim($base_url, "/");
        }

        $this->assertIsValidBaseUrl($base_url);

        if ($require_broker) {
            // ensure they can access the broker page
            FeatureFlags::set('enable_broker', 1);
        }


        $application = $this->githubServerApplicationsRepo->getByBaseUrlAndKind($base_url, "code_scanning");
        if ($application != null) {
            if ($application["created_by_id"] != Auth::getUser()) {
                throw new BadRequestException("You are not authorized to create a GitHub server application for this account");
            }

            // github server application already installed, but probably new installation is requested, ensure account is converted to github_server account
            $current_scm_org = $this->relGroupScmOrgRepo->getSCMforCurrentGroup();
            if ($current_scm_org['type'] === 'selfscan') {
                $this->convertAccountAppropriately(application_id: $application["id"], base_url: $base_url, require_broker: $require_broker);
            }

            if ($application["installation_status"] === "completed") {
                return [ "status" => "already_exists", "application_id" => $application["id"] ];
            }

            return [ "status" => "created", "application_id" => $application["id"] ];
        } else {
            $application_id = $this->githubServerApplicationsRepo->save(kind: "code_scanning", base_url: $base_url);
        }

        $this->convertAccountAppropriately(application_id: $application_id, base_url: $base_url, require_broker: $require_broker);

        return [ "status" => "created", "application_id" => $application_id ];
	}

    private function convertAccountAppropriately($application_id, $base_url, $require_broker) {
        if ($require_broker) {
            // a broker is required, just connect current group to the GH server app and redirect in frontend to broker page
            $this->relGroupScmOrgRepo->updateGithubServerApplicationIdForSelfscanGroup($application_id);
        } else {
            // no broker needed, convert selfscan account to github server account
            $this->relGroupScmOrgRepo->convertSelfScanAccountToGithubServerAccount(github_server_application_id: $application_id, scm_org_base_url: $base_url);
        }
    }

    private function assertCanCreateGithubServerApplication() {
        $current_scm_org = $this->relGroupScmOrgRepo->getSCMforCurrentGroup();

        $current_scm_org_type = $current_scm_org['type'] ?? null;
        if ($current_scm_org_type !== 'selfscan') {
            throw new BadRequestException("You can not create a GitHub server application for this account type");
        }
    }

    private function assertAccountIsEligibleForConversion() {
        $sys_group_info = Auth::getGroupInfo();
        $sys_group_created_at = $sys_group_info['date_created'] ?? null;
        $two_weeks_ago = strtotime('2 weeks ago');

        if ($sys_group_created_at < $two_weeks_ago) {
            throw new BadRequestException("Your account is too new to be converted to a github server account");
        }
    }

    private function assertIsValidBaseUrl($base_url) {
        UrlValidation::assertIsRemoteURL($base_url);

        $blacklisted_prefixes = [
            "https://github.com",
            "http://github.com",
            "https://app.aikido.dev",
            "http://app.aikido.dev",
        ];

        foreach($blacklisted_prefixes as $prefix)
		{
			if(substr($base_url, 0, strlen($prefix)) === $prefix)
			{
				throw new BadRequestException("The provided base URL \"{$base_url}\" is not allowed due to security reasons");
			}
		}
    }

}
