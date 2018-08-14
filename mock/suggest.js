
import { Random, mock } from "mockjs";

const some = () => {
  let data = [];
  let len = Random.integer(10,20);
  for (let idx = 0; idx < len; idx++) {
    const id = Random.id();
    const na = Random.cname();
    data.push(
      mock({
        'key': id,
        'label': na,
      })
    );
  }
  return data;
};

export default {
  'get /suggest': some()
};