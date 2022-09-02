SHELL := bash
.ONESHELL:
.SHELLFLAGS := -eu -o pipefail -c
.DELETE_ON_ERROR:

MAKEFLAGS += --warn-undefined-variables
MAKEFLAGS += --no-builtin-rules

include .env
$(eval export $(shell sed -ne 's/ *#.*$$//; /./ s/=.*$$// p' .env))

COMMA := ,

PROJECT_NAME := $(shell echo $(notdir $(CURDIR)) | sed -e 's/_/-/g')

DOCKER_HUB := 10446005/
CURRENT_BRANCH := $(shell git rev-parse --abbrev-ref HEAD  | sed -e 's/_/-/g; s/\//-/g')
CURRENT_VERSION := $(shell git rev-parse --short HEAD)

build: Dockerfile  ## Build docker image
	DOCKER_DEFAULT_PLATFORM=linux/amd64 docker build \
		-f $^ \
		--tag $(DOCKER_HUB)$(PROJECT_NAME):$(CURRENT_BRANCH) \
		--tag $(DOCKER_HUB)$(PROJECT_NAME):$(CURRENT_VERSION) .
.PHONY: build

genconfig: 
	sed -e 's#<API_ENDPOINT>#$(API_ENDPOINT)#g' \
		-e 's#<SENTRY_DSN>#$(SENTRY_DSN)#g' \
		-e 's#<SENTRY_ENV>#$(SENTRY_ENV)#g' \
		-e 's#<NEXTAUTH_URL>#$(NEXTAUTH_URL)#g' \
		-e 's#<SENTRY_URL>#$(SENTRY_URL)#g' \
		-e 's#<SENTRY_ORG>#$(SENTRY_ORG)#g' \
		-e 's#<SENTRY_PROJECT>#$(SENTRY_PROJECT)#g' \
		-e 's#<SENTRY_AUTH_TOKEN>#$(SENTRY_AUTH_TOKEN)#g' \
		-e 's#<SENTRY_RELEASE>#$(CURRENT_BRANCH)@$(CURRENT_VERSION)#g' \
		-e 's/<GOOGLE_CLIENT_ID>/$(GOOGLE_CLIENT_ID)/g' \
		-e 's/<GOOGLE_CLIENT_SECRET>/$(GOOGLE_CLIENT_SECRET)/g' \
		-e 's/<SECRET>/$(SECRET)/g' \
		next.config.js.example > next.config.js
.PHONY: genconfig