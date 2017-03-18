import csv
import json
import requests


def trim():
    with open('nasdaq.csv', 'r') as f:
        with open('new.csv', 'w') as w:
            counter = 0
            w.write('"Symbol",\n')
            query = 'https://query.yahooapis.com/v1/public/yql?q=select * from yahoo.finance.historicaldata where symbol = "{0}" and startDate = "2010-01-01" and endDate = "2010-01-30"&format=json&diagnostics=false&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback='
            reader = csv.reader(f, delimiter=',')
            for line in reader:
                data = requests.get(query.format(line[0]))
                parsed = json.loads(data.content)
                counter += 1
                if parsed['query']['results']:
                    w.write('"' + line[0] + '",\n')
                    print 'Symbol nr {0}: {1}'.format(counter, line[0])


if __name__ == '__main__':
    trim()

