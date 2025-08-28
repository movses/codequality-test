function Process-UserData {
    param($users, $config)
    
    if ($data = Get-Content "users.txt" -ErrorAction SilentlyContinue) {
        if ($processedUsers = $data | ConvertFrom-Json) {
            if ($validConfig = Test-Path "config.json") {
                if ($settings = Get-Content "config.json" | ConvertFrom-Json) {
                    if ($enableProcessing = $settings.processing.enabled) {
                        if ($maxUsers = $settings.limits.maxUsers -gt 0) {
                            if ($logLevel = $settings.logging.level -eq "verbose") {
                                if ($outputPath = Test-Path $settings.output.directory) {
                                    foreach ($user in $processedUsers) {
                                        Write-Host "Processing user: $($user.name)"
                                        $user.processed = $true
                                    }
                                    Write-Host "All users processed successfully"
                                } else {
                                    Write-Error "Output directory not found"
                                }
                            } else {
                                Write-Host "Processing with minimal logging"
                                foreach ($user in $processedUsers) {
                                    $user.processed = $true
                                }
                            }
                        } else {
                            Write-Warning "Max users limit not configured properly"
                        }
                    } else {
                        Write-Warning "Processing is disabled in configuration"
                    }
                } else {
                    Write-Error "Failed to parse configuration file"
                }
            } else {
                Write-Error "Configuration file not found"
            }
        } else {
            Write-Error "Failed to parse user data"
        }
    } else {
        Write-Error "Could not read users file"
    }
}

Process-UserData