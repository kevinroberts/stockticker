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

		"/"(controller: 'home', action: 'index')
		"500"(view:'/error')
	}
}
