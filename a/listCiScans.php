<?php
namespace controllers\public_api\rest\reports\v1;
use Core\input_validation\ObjectFieldValidation;
use League\Route\Http\Exception\BadRequestException;
class listCiScans implements \controllers\controllerInterface
{
	public function __construct(
		private \App\repositories\integrations\continuous_integration\scanRuns $ciScanRunsRepo,
	){}
	public function handleRequest($request, $args, $response)
	{
		$getvars = $request->getQueryParams();
		$page = $getvars['page'] ?? 0;
		$page = ObjectFieldValidation::assertFieldOnObjectIsPositiveInteger(['page' => $page], 'page');
		
		$per_page = $getvars['per_page'] ?? 20;
		$per_page = ObjectFieldValidation::assertFieldOnObjectIsPositiveInteger(['per_page' => $per_page], 'per_page');
		if($per_page > 50) {
			throw new BadRequestException("'per_page' can have a maximum value of 100");
		}
	
		$filter_code_repo_id = $getvars['filter_code_repo_id'] ?? null;
		if($filter_code_repo_id) {
			$filter_code_repo_id = ObjectFieldValidation::assertFieldOnObjectIsPositiveInteger(['filter_code_repo_id' => $filter_code_repo_id], 'filter_code_repo_id');
		}
		$filter_gate_status = $getvars['filter_gate_status'] ?? 'all';
		$filter_gate_status = ObjectFieldValidation::assertFieldOnObjectIsInArray(['filter_gate_status' => $filter_gate_status], 'filter_gate_status', ['all', 'timed_out', 'unknown', 'passed', 'failed', 'bypassed', 'pending']);
		$search = trim($getvars['search'] ?? '');
		$ci_scan_runs = $this->ciScanRunsRepo->listCiScanRuns(
			page: $page,
			per_page: $per_page,
			search: $search,
			repo_id: $filter_code_repo_id,
			gate_status: $filter_gate_status,
		);
		$pull_requests_ci_checks = $this->formatCiScanRuns($ci_scan_runs);
		return $pull_requests_ci_checks;
	}
	private function formatCiScanRuns($ci_scan_runs)
	{
		$formatted_ci_scan_runs = [];

		foreach ($ci_scan_runs as $ci_scan_run) {
			$filter_gate_status = $this->getGateStatus($ci_scan_run);

			$metadata = json_decode($ci_scan_run['metadata'], true);
			$formatted_ci_scan_run['pull_request_title'] = $metadata['pull_request_metadata']['title'] ?? null;
			$formatted_ci_scan_run['pull_request_url'] = $metadata['pull_request_metadata']['html_url'] ?? $metadata['pull_request_metadata']['url'] ?? null;
			$formatted_ci_scan_run['branch_name'] = $metadata['ref'] ?? null;
			$formatted_ci_scan_run['is_release_gating'] = $metadata['is_release_gating'] ?? false;
			$formatted_ci_scan_runs[] = $formatted_ci_scan_run;
		}
		return $formatted_ci_scan_runs;
	}
	private function getGateStatus($ci_scan_run)
	{
		if ($ci_scan_run['status'] == 'timed_out') {
			return 'timed_out';
		}

		return $ci_scan_run['filter_gate_status'];
	}
}
