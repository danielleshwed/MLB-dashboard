FROM node:latest
WORKDIR /konrad-test
COPY . .
RUN yarn run build

FROM node:latest
RUN yarn global add serve
WORKDIR /konrad-test
COPY --from=0 /konrad-test/build .
CMD [“serve”, “-p 80”, “-s”, “.”]
