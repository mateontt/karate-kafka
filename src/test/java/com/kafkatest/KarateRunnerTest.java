package com.inditex.finc.hosieser.karate;

import com.inditex.merlin.karate.ReportUtils;
import com.intuit.karate.Results;
import com.intuit.karate.Runner;
import com.intuit.karate.cli.IdeMain;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import static org.apache.commons.lang3.StringUtils.defaultString;

import java.util.Arrays;
import java.util.Optional;

public class KarateRunnerTest {

    private final String[] classpath = { "classpath:test-cases",
            "classpath:" + this.getClass().getPackage().getName().replaceAll("\\.", "/") };

    @Test
    public void run() throws Exception {

        String karateEnv = defaultString(System.getProperty("E2E_EXECUTION_ENVIRONMENT"), "local").toLowerCase();
        String launchCommand = defaultString(System.getProperty("KARATE_OPTIONS"));

        com.intuit.karate.Main options = IdeMain.parseIdeCommandLine(launchCommand);

        Results results = Runner
            .path(Optional.ofNullable(options.getPaths()).orElse(Arrays.asList(this.classpath)))
            .hooks(options.createHooks())
            .tags(options.getTags())
            .configDir(options.getConfigDir())
            .karateEnv(karateEnv)
            .outputHtmlReport(true)
            .outputCucumberJson(true)

            .outputJunitXml(true)
            // .parallel(options.getThreads());
            .parallel(1);

        ReportUtils.prepareReports(results);
        Assertions.assertEquals(0, results.getFailCount(), ReportUtils.createSummary(results));

    }

}
