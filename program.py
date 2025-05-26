import os


basisverzeichnis = os.getcwd()
txt_verzeichnis = os.path.join(basisverzeichnis, "txt")
smali_verzeichnis = os.path.join(basisverzeichnis, "smali")

if not os.path.exists(smali_verzeichnis):
    os.makedirs(smali_verzeichnis)

for dateiname in os.listdir(txt_verzeichnis):
    if dateiname.endswith(".txt"):
        txt_pfad = os.path.join(txt_verzeichnis, dateiname)
      
        name_ohne_endung = os.path.splitext(dateiname)[0]
        smali_name = name_ohne_endung.replace("_", "/")

        smali_pfad = os.path.join(smali_verzeichnis, name_ohne_endung + ".smali")
        
        with open(txt_pfad, "r", encoding="utf-8") as txt_datei, open(smali_pfad, "w", encoding="utf-8") as smali_datei:
            smali_datei.write(f".class public L{smali_name};\n")
            smali_datei.write(".super Ljava/lang/Object;\n\n")
            
            # Zeilen der txt-Datei verarbeiten
            for zeile in txt_datei:
                zeile = zeile.strip()
                if " -- " in zeile:
                    parts = zeile.split(" -- ", 1)
                    feldname = parts[0]
                    feldwert = parts[1]
                    smali_datei.write(f'.field public static {feldname}:Ljava/lang/String; = {feldwert}\n')

print("Transformed all  txt files into smali files!")
