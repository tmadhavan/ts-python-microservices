import threading
import pdf_scanner

from queue import Queue

class ProcessorThread(threading.Thread):

  def __init__(self, procesing_queue: Queue, publishing_queue: Queue):
    super.__init__()
    self._processing_queue = procesing_queue
    self._publishing_queue = publishing_queue

  def run(self) -> None: 
    self.start_processing()

  def start_processing(self):
    while True:
      file_id = self._processing_queue.get()
      try:
        s3client.download(file_id)
        pdf_scanner.scan_pdf(path_to_pdf)
        emailer.success_email()
      except: 
        emailer.failure_email()
