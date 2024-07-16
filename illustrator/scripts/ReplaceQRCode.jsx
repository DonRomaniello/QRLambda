// https://ioconsolerykerprod.blob.core.windows.net/adobe-apiplatform-prod-ioconsole-cdn/installers/ai/scripting/2024/web/v1/Illustrator%20JavaScript%20Scripting%20Reference.pdf?sv=2021-08-06&se=2024-07-16T22%3A29%3A50Z&sr=c&sp=r&sig=cEpjIbbrDiLeh7q5asnB3E2sWQWQsCf8%2B1uoaQJMjk4%3D

// var exportPath = new File("../output/test.png");

// app.activeDocument.exportFile(exportPath, ExportType.PNG24, undefined);

var paths = app.activeDocument.pathItems

var found = false;

for (var i = 0; i < paths.length; i++) {
    if (paths[i].name == "qracode") {
        paths[i].rotate(30);
        found = true;
    }
}

if (!found) {
    alert("QR Code not found. Is the placeholder named qrcode?");
}
