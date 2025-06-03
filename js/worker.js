self.onmessage = function (e) {
  if (e.data === "start-heavy-task") {
    for (let i = 0; i < 10000000; i++) {
      const temp = Math.sqrt(i) * Math.sqrt(i);
    }
    self.postMessage("heavy-task-done");
  }
};
