
import { Random, mock } from "mockjs";

const total = Random.integer(5,30);
const size = 10;

const some = (total, size) => {
  let data = [];
  for (let idx = 0; idx < size; idx++) {
    const id = Random.id();
    const na = Random.cname();
    data.push(
      mock({
        'key': id,
        'label': na,
      })
    );
  }
  return { data:data, total:total };
};

export default {
  'get /suggest2': function(req, res, next) {
    res.json(some(total, size));
  }
};
