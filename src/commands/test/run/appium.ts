import * as pfs from "../../../util/misc/promisfied-fs";
import * as path from "path";
import { generateAbsolutePath } from "../../../util/misc/fs-helper";
import { CommandArgs, help, name, longName, hasArg, required, ErrorCodes } from "../../../util/commandline";
import { RunTestsCommand } from "../lib/run-tests-command";
import { AppiumPreparer } from "../lib/appium-preparer";
import { Messages } from "../lib/help-messages";
import { JUnitXmlUtil } from "../lib/junit-xml-util";

@help(Messages.TestCloud.Commands.RunAppium)
export default class RunAppiumTestsCommand extends RunTestsCommand {

  @help(Messages.TestCloud.Arguments.AppiumBuildDir)
  @longName("build-dir")
  @hasArg
  @required
  buildDir: string;

  @help(Messages.TestCloud.Arguments.MergeJUnitXml)
  @longName("merge-junit-xml")
  @hasArg
  mergeJUnitXml: string;

  constructor(args: CommandArgs) {
    super(args);
  }

  protected prepareManifest(artifactsDir: string): Promise<string> {
    const preparer = new AppiumPreparer(artifactsDir, this.buildDir);
    return preparer.prepare();
  }

  protected getSourceRootDir() {
    return this.buildDir;
  }

  protected async validateOptions(): Promise<void> {
    if (!this.testOutputDir && this.mergeJUnitXml) {
      throw new Error("Argument --test-output-dir is required for argument --merge-junit-xml");
    }
  }

  protected async mergeTestArtifacts(): Promise<void> {
    if (!this.mergeJUnitXml) {
      return;
    }

    let reportPath: string = generateAbsolutePath(this.testOutputDir);
    if (!reportPath) {
      return;
    }

    const xmlUtil: JUnitXmlUtil = new JUnitXmlUtil();
    const pathToArchive: string = path.join(reportPath, "junit_xml_zip.zip");

    const xml: Document = await xmlUtil.mergeXmlResults(pathToArchive);

    if (!xml) {
      throw new Error(`Couldn't merge xml test results to ${this.mergeJUnitXml}`);
    }

    return pfs.writeFile(path.join(reportPath, this.mergeJUnitXml), xml);
  }
}
