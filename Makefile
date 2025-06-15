build-image-run-local:
	docker build -t angular-app:latest .
	docker run --name angular-app --rm -it -p 4200:4200 angular-app:latest