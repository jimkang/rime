data/phoneme-groups-with-syllables.json:
	cd node_modules/phonemenon && \
	make phoneme-groups-with-syllables.json && \
	cp phoneme-groups-with-syllables.json ../../data

data/syllables-for-words.json: data/phoneme-groups-with-syllables.json
	cat data/phoneme-groups-with-syllables.json | node build/phoneme-groups-to-word-dict.js > data/syllables-for-words.json

test: data/syllables-for-words.json
	node tests/digester-tests.js
	node tests/syllable-butcher-tests.js
	node tests/index-tests.js

build-word-phoneme-map:
	node build/build-word-phoneme-map.js
