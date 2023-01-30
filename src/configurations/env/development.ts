import * as _ from 'lodash';

export default _.extend({}, {
  kafka: {
    clientId: 'kudi',
    brokers: ['kafka:9092'],
    groupId: 'kudi-operation',
    transferTopic: 'kudi-operation:transfer',
    depositTopic: 'kudi-operation:transfer',
    withdrawTopic: 'kudi-operation:transfer',
  },
});
