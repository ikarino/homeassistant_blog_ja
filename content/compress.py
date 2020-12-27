#!/usr/bin/env python
import subprocess

for line in open("imgs.txt"):
    size, path = line.split()
    if int(size) < 10000:
        continue
    print(path)
    subprocess.run([
        "mogrify",
        "-resize",
        "30%",
        path,
    ])
