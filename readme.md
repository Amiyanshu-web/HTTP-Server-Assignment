# HTTP SERVER


### How to run the server in Docker

1. Clone the repository
2. Run the following command to build the docker image

```bash

docker build -t <image-name> -f Dockerfile .
```

3. Run the following command to run the docker image

```bash
docker run -d -p 8080:8080 --memory="1500m" --cpus="2.0" <image-name>
```

4. The server will be running on port 8080

### How to run the server locally

1. Clone the repository
2. Run the following command to install the dependencies

```bash
npm install
```

3. Run the following command to start the server

```bash
npm start
```

4. The server will be running on port 8080


## Optimization

### Docker Image Size Reduction

To optimize the Docker image size, the following strategies have been implemented:

1. **Minimal Base Image:** The Docker image is based on the lightweight and minimalistic Node Alpine base image, reducing unnecessary overhead and resulting in a more compact image.

2. **Text File Compression:** All text files have been compressed into a single zip folder. This approach significantly reduces the overall image size, especially when dealing with large text files. By utilizing the `yauzl` library, the code efficiently reads files directly from the compressed zip folder.

### Results

- **Initial Image Size:** Without compression, the Docker image size was 3.47GB.
- **Optimized Image Size:** With text file compression and minimal base image usage, the Docker image size has been reduced to 150MB.

These optimization techniques lead to a more streamlined and efficient Docker image, enhancing resource utilization and facilitating faster deployments.


- I have also used the `--memory` and `--cpus` flag to limit the memory and cpu usage of the container


