build-image-run-local:
	docker build -t angular-app:latest --build-arg BE_HOST=localhost:8082 .
	docker run --name angular-app --rm -it -p 4200:5000 angular-app:latest