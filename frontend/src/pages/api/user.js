export default (req, res) => {
  const { email, password } = req.body;
  User.findByCredentials(email, password)
    .then((user) => user.generateSessionId())
    .then((sessionId) => {
      const { name } = user;
      res
        .setHeader("Set-Cookie", `sessionId=${sessionId}; HttpOnly; Secure`)
        .send(`welcome my homie, ${name}`);
    })
    .catch((e) => {
      // reject due to wrong email or password
      res.status(401).send("rejected email");
    });
};
