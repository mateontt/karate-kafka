var reporter = require('cucumber-html-reporter');

var options = {
        theme: 'hierarchy',
        jsonFile: 'target/cucumber-html-reports/cucumber_result.json',
        output: 'target/cucumber-html-reports/cucumber_report.html',
        reportSuiteAsScenarios: true,
        scenarioTimestamp: true,
        launchReport: true,
        columnLayout:2




        // metadata: {
        //     "App Version":"0.3.2",
        //     "Test Environment": "STAGING",
        //     "Browser": "Chrome  54.0.2840.98",
        //     "Platform": "Windows 10",
        //     "Parallel": "Scenarios",
        //     "Executed": "Remote"
        // }
    };

    reporter.generate(options);
    
