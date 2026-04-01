class PubKeys {
	constructor() {
		this.pubKeys = {};
		this.fetchPubKey();
	}
	async getPubKey(kid) {
		return (this.pubKeys[kid] = this.pubKeys[kid] || (await this.fetchPubKey())[kid]);
	}

	async fetchPubKey() {
		console.log("Fetching public keys");
		try {
			const res = await fetch(`https://rdv-public.s3.ap-south-1.amazonaws.com/auth-platform/pubkeys.json`);
			const data = await res.json();
			this.pubKeys = data;
			return data;
		} catch (error) {
			console.error(error);
			return {};
		}
	}
}

export default new PubKeys();
