build-image-run-local:
	docker build -t angular-app:latest .
	docker run --name angular-app --rm -it -p 4200:80 angular-app:latest