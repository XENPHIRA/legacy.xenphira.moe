# Usage:
# make				# initiate build, commit to git, and push
# make clean		# clean the build directory
# make build		# build site
# make charhelper 	# (re-)gather character data files and add to data.json for refs
# make serve		# run locally for testing

.PHONY = clean

BUILD_DIR = "./docs/"
BUILD_DATE = $(shell date --iso=seconds)

info:
	@echo "Please run a command"
	@echo "\tmake clean\tCleans build dir"
	@echo "\tmake build\tRuns charhelper then builds site for prod"
	@echo "\tmake charhelper\tRebuilds character data file"
	@echo "\tmake serve\tRuns charhelper then serves local copy of site for testing"

clean:
	@echo "Cleaning Build Directory $(BUILD_DIR)"
	(ls $(BUILD_DIR))
	@echo "jk, not gonna do that!"

charhelper:
	(cd src/pages/ref && python helper.py && cd ../../../)

serve: charhelper servestep

servestep:
	(npm run serve)

build: charhelper buildstep

buildstep:
	(npm run build && git add . && git commit -m "Build $(BUILD_DATE)")
	@echo "Remember to push!"