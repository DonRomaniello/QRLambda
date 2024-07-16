import subprocess
import os

# Directory where the QR code will be saved
directory = "qrCodes"

# Create the directory if it does not exist
if not os.path.exists(directory):
    os.makedirs(directory)

amount = 5

for pi in range(amount):
    # Run the qrencode command to generate the QR code
    subprocess.run([
        "qrencode", # Command
        "-i", # ignore case, output uppercase only
        "-l", "M", # Error correction level
        # "-S", # Structured symbols
        # "-v", "21", # version number
        # "-t", "SVG", # type of output
        "-t", "PNG", # type of output
        "-m", "0", # margin
        "-o", f"{directory}/qr{pi}.svg", # output file
        # "-o", f"{directory}/qr{pi}.png", # output file
        f"https://mvzm6b3rsepubtdcbruam7lqzi0flelz.lambda-url.us-east-1.on.aws/?id={pi}&d=ps&sd=&p=classes".upper()])

    