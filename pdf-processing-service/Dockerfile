FROM python:3
EXPOSE 3002

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . ./

# CMD ["gunicorn", "-b", "0.0.0.0:3002", "main:__hug_wsgi__"]
ENTRYPOINT ["python", "-u", "src/app.py"]