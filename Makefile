SHELL := bash
.ONESHELL:
.SHELLFLAGS := -eu -o pipefail -c
.DELETE_ON_ERROR:

MAKEFLAGS += --warn-undefined-variables
MAKEFLAGS += --no-builtin-rules

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