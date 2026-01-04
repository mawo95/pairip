import os

smali_folder = 'smali'

for filename in os.listdir(smali_folder):
    if filename.endswith('.smali'):
        name_part = filename[:-6]
        new_name_part = name_part.split('_')[-1]
        new_filename = new_name_part + '.smali'
        old_path = os.path.join(smali_folder, filename)
        new_path = os.path.join(smali_folder, new_filename)

        if not os.path.exists(new_path):
            os.rename(old_path, new_path)
            print(f"Renamed: {filename} -> {new_filename}")
        else:
            print(f"Skipped: {filename} (target {new_filename} already exists)")
