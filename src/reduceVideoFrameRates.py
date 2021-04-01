from pathlib import Path
import os
import subprocess
import re 
import ffmpeg 


directory = os.path.dirname(os.path.realpath(__file__))


pathlist = Path(directory).glob('**/*.webm')
for path in pathlist:
  pathFull = str(path)
  fileName = str(path).split("\\")[-1]
  outFileName = fileName[0: len(fileName) - 5] + ".mp4"
  fileDir = str(path)[0:(len(str(path)) - 1 - len(fileName))]
  outFilePath = fileDir + "\\" + outFileName
  if not os.path.exists(outFilePath):
    (
      ffmpeg
      .input(pathFull)
      .filter('fps', 30, round='down')
      .filter('pad', 'ceil(iw/2)*2', 'ceil(ih/2)*2')
      .output(outFilePath)
      .overwrite_output()
      .run()
    )