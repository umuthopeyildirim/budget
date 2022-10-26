FROM ruby:2.7.2-alpine

WORKDIR /budget

COPY . .

RUN apk add --no-cache build-base postgresql-dev yarn && \
    yarn install --non-interactive --check-files && \
    gem install bundler && \
    bundle update

EXPOSE 3000

ENTRYPOINT [ "/budget/entrypoint.sh" ] 
