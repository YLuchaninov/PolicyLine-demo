const RADIUS = 5000; // 5 km
const LIMIT = 50; // 50 posts in page

function selectorBuilder(query) {
    const selector = {};
    const location = query.location;

    // location search
    if (location && location.length === 2) {
        selector.location = {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: location
                },
                $maxDistance: (query.radius || RADIUS),
            }
        }
    }

    // tags search
    if (query.tags) {
        selector.tags = {
            $in: query.tags
        }
    }

    // user selected
    if (query.user) {
        selector.author = query.user;
    }

    return selector;
}

function limitBuilder(query) {
    return [query.page || 0, query.limit || LIMIT];
}

export {
    selectorBuilder,
    limitBuilder
};