import * as dotenv from 'dotenv'
import App from './app';
import validateEnv from './utils/validateEnv';
import IndexRoute from './routes/index.route';
import UsersRoute from './routes/users.route';
import AuthRoute from './routes/auth.route';
import DepositRoute from './routes/deposit.route';
import BalanceRoute from "./routes/balance.route";
import TransferRoute from "./routes/transfer.route";
import CountryRoute from "./routes/country.route";

dotenv.config();

validateEnv();

const app = new App([
  new IndexRoute(),
  new UsersRoute(),
  new AuthRoute(),
  new DepositRoute(),
  new BalanceRoute(),
  new TransferRoute(),
  new CountryRoute()
]);

app.listen();
