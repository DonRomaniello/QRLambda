import subprocess
import os

# Directory where the QR code will be saved
directory = "qrCodes"

# Create the directory if it does not exist
if not os.path.exists(directory):
    os.makedirs(directory)


amount = 5

for i in range(amount):
    # Run the qrencode command to generate the QR code
    subprocess.run(["qrencode", "-t", "SVG", "-o", f"{directory}/qr{i}.svg", f"https://www.google.com?q={i}"])