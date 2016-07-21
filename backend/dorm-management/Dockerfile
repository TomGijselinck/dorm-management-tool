FROM ruby:2.2
RUN apt-get update -qq \
    && apt-get install -y build-essential libpq-dev nodejs \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir /app
WORKDIR /app/backend
COPY Gemfile /app/backend
COPY Gemfile.lock /app/backend
RUN bundle install

EXPOSE 3000
CMD bundle exec passenger start -e production