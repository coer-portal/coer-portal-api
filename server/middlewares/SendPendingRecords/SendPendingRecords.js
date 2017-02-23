module.exports = function (Data, pendingRecords) {
	const FilterById = () => {
		if (Data._id) {
			return {_id: Data._id};
		} else {
			return {};
		}
	};

	return new Promise((resolve, reject) => {
		pendingRecords.find(FilterById()).toArray((err, data) => {
			if (err) {
				reject({
					error: 1,
					message: "Error Occured in fetching List from Database"
				});
			}
			if (data.length > 0) {
				resolve({
					error: 0,
					data: data
				});
			} else {
				reject({
					error: 'E201',
					message: 'No Records Today',
					data: 0
				});
			}
		});
	});
};