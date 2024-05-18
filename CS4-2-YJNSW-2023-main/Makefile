.DEFAULT_GOAL := help

export PROJECT_PATH := ${PWD}
export PROJECT_NAME := yjnswcp

.PHONY: install
install: ## install all the things
	docker compose -f ./docker-compose.utils.yml run --rm node-16 \
		npm install

.PHONY: start
start: install ci-start ## start the stack

.PHONY: ci-start
ci-start: # start the stack but skip installing dependencies
	docker compose -p $(PROJECT_NAME) up -d

.PHONY: stop
stop: ## stop and remove the containers
	docker compose -p $(PROJECT_NAME) down --remove-orphans

.PHONY: restart
restart: stop start ## stop and start the stack

.PHONY: logs
logs: ## display docker compose logs
	docker compose -p $(PROJECT_NAME) logs -f --tail=500

.PHONY: pretty
pretty: ## run prettier on staged files but don't restage them
	docker compose -f ./docker-compose.utils.yml run --rm node-16 \
		npm run pretty.

.PHONY: lint
lint: ## lint the project
	docker compose -f ./docker-compose.utils.yml run --rm node-16 \
		bash /workdir/scripts/lint.sh

.PHONY: test
test: ## run unit tests
	docker compose -f ./docker-compose.utils.yml run --rm node-16 \
		bash /workdir/scripts/test.sh

.PHONY: e2e
e2e: ## run e2e integration tests
	docker compose -p yjnswcp-e2e -f ./docker-compose.e2e.yml up --exit-code-from yj-e2e

.PHONY: e2e-stop
e2e-stop: ## run e2e integration tests
	docker compose -p yjnswcp-e2e -f ./docker-compose.e2e.yml down --remove-orphans

.PHONY: e2e-local-install
e2e-local-install: ## install cypress locally. Your mileage may vary
	npx cypress install

.PHONY: e2e-local
e2e-local: e2e-local-install ## open cypress test runner on your local
	npm run open -w apps/e2e

.PHONY: e2e-local-run
e2e-local-run: e2e-local-install ## run cypress tests on your local
	npm run run -w apps/e2e

.PHONY: commit
commit: ## commit with commitizen's help
	docker compose -f ./docker-compose.utils.yml run --rm -v $(HOME)/.gitconfig:/etc/gitconfig node-16 \
		npm run commit

.PHONY: bootstrap
bootstrap: ## load initial cms data
	docker compose -f ./docker-compose.utils.yml run --rm --workdir /workdir/apps/bootstrap node-18 \
		npm run bootstrap

## help ############################################################################################

# https://www.client9.com/self-documenting-makefiles/
.PHONY: help
help: ## display a list of available commands
	@awk -F ':|##' '/^[^\t].+?:.*?##/ {\
	printf "\033[36m%-30s\033[0m %s\n", $$1, $$NF \
	}' $(MAKEFILE_LIST)
