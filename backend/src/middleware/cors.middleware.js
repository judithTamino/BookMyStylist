import Cors from "cors";

const cors = Cors({
  origin: [
    "http://127.0.0.1:5173",
    "http://localhost:5173",
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
});

export default cors;