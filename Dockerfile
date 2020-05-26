FROM node
ADD . app
RUN cd app&&npm install --silent && npm i react && npm i react-dom&&npm run build
ENTRYPOINT cd app && npm run dev --silent