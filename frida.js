const frida = require('frida');
const { execSync } = require('child_process');
const fs = require("fs");

console.log("Newest Version working 2026!")
async function all(){
    try {
        execSync("adb connect emulator-5554");
        execSync("adb -s emulator-5554 forward tcp:27042 tcp:27042");

        const deviceManager = frida.getDeviceManager();
        const device = await deviceManager.addRemoteDevice("127.0.0.1:27042");
        const processes = await device.enumerateProcesses();
        const target = processes.find(p => p.name === "APP_NAME_HERE");
        if (!target) {
            throw new Error("You opened the app?");
        }
        const session = await device.attach(target.pid);

   
const scriptCode = `
        Java.perform(function () {
           var targetClasses = [
    "android.support.v4.graphics.drawable.fNQE.VmyNRCLX",
    "android.window.giP.dsYhA",
   //replace with your classnames like this
];

            targetClasses.forEach(function(targetClass) {
                try {
                    var clazz = Java.use(targetClass);
                    var fields = clazz.class.getDeclaredFields();
                    var outputLines = [];

                    fields.forEach(function (f) {
                        try {
                            f.setAccessible(true);
                            var value = f.get(null);
                             var str = value.toString();

        if (
            typeof str !== 'string' ||
            str.trim() === '' ||
            str.includes("\\n") ||
            str.includes("\\r") ||
            str.includes("\\t") ||
            str.includes("\\0")
        ) {
            }
                            var line = f.getName() + " -- " + JSON.stringify(str);
                            outputLines.push(line);
                        } catch (e) {
                            console.log("    Fehler beim Zugriff auf " + f.getName() + ": " + e);
                        }
                    });

                    send({
                        type: "dump",
                        className: targetClass,
                        lines: outputLines
                    });

                } catch (err) {
                    console.log("[-] Error with class " + targetClass + ": " + err.message);
                }
            });

            send({ type: "done" });
            console.log("Dumped all values.");
        });
    `


        const script = await session.createScript(scriptCode);

        script.message.connect(message => {
        if (message.type === 'send') {
            const payload = message.payload;
            if (payload.type === 'dump') {
                const filename = payload.className.replace(/\./g, "_") + ".txt";
                fs.writeFileSync(filename, payload.lines.join("\n"), 'utf-8');
                console.log(`[+] Wrote ${filename}`);
            } else if (payload.type === 'done') {
                console.log("[*] All classes dumped.");
            }
        } else {
            console.error("[!] Message error:", message);
        }
    });
        await script.load();
        console.log("[*] Script erfolgreich geladen.");

    } catch (err) {
        console.error("❌ Fehler:", err.message);
    }
}

all();
