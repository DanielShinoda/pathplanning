module.exports = {
    manhattan: function(dx, dy) {
        return dx + dy;
    },

    euclidian: function(dx, dy) {
        return Math.sqrt(dx * dx + dy * dy);
    },

    chebyshev: function(dx, dy) {
        return Math.max(dx, dy);
    }
};