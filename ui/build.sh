

cd ui/react/ && \
npm i && \
npm run build && \
cd ../build && \
docker build -t redit/conv-ui .


