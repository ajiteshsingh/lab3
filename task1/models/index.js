module.exports = {
  processMatches(req, res, callback) {
    result = [];
    const currentSessionAnswers = req.session.answers;
    req.sessionStore.all((err, sessions) => {
      for (let key in sessions) {
        const element = sessions[key];
        let count = 0;
        if (element.user != req.session.user) {
          for (const [key, value] of Object.entries(currentSessionAnswers)) {
            if (key in element.answers && currentSessionAnswers[key] == value) {
              count += 1;
            }
          }
          result.push({ user: element.user, match: count });
        }
      }
      result.sort((a, b) => a.count - b.count);
      callback({ data: result, user: req.session.user });
    });
  },
};
