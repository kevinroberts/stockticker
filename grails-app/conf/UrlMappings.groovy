class UrlMappings {

	static mappings = {
		"/$controller/$action?/$id?"{
			constraints {
				// apply constraints here
			}
		}

        name symbol: "/symbol/$symbol" {
            controller = "home"
            action = "priceQuote"
        }

		name symbolScraped: "/symbolScraped/$symbol" {
			controller = "home"
			action = "priceQuoteScraped"
		}

		"/"(controller: 'home', action: 'index')
		"500"(view:'/error')
	}
}
