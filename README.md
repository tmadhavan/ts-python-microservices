# ts-python-microservices
Learning some microservices architecture, using TS/Node, Python, and RabbitMQ. 

This will eventually re-implement my PDF barcode scanner project, using a microservices architecture rather than a monolithic server application. For now (May 2019) it is a simple learning project for investigating how microservices are built - particularly in conjunction with a message broker as opposed to RESTful interactions between services - and how they can be deployed (i.e. using Docker/Docker Compose/Kubernetes). 

The aim is to have:
  - a simple Vue frontend for uploading a PDF
  - a Node/NestJS/TS backend service for receiving the PDF (and maybe putting it in cloud storage
  - a Python service for doing the actual manipulation of the PDF (converting pages to images, scanning for barcodes, outputting to text - this will probably be taken from my previous Barcode Scanner project) 
  - an email service for notifying a user when their PDF has been scanned for barcodes (or a failure has occurred), including an attachment with the detected barcodes
  - a RabbitMQ service to broker messages between the other services
  
