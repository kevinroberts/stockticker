package stockticker

class Stock {

	String name
	String symbol
	Date created
	Date lastUpdated

	def beforeInsert() {
		created = new Date()
		lastUpdated = new Date()
	}

	def beforeUpdate() {
		lastUpdated = new Date()
	}

    static constraints = {
		symbol(nullable: false, blank: false, unique: true)
		name(nullable: true)
    }

    String toString(){name}
}
