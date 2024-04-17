const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    database: 'employee_db',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: ''
  },

  console.log(`Connected to the employee_db database.`)
);