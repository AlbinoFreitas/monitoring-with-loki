# How To

## Create Namespace

```kubectl create namespace monitoring```

## Change to Namespace

```kubectl config set-context --current --namespace=monitoring```

## Install Loki

```helm repo add grafana https://grafana.github.io/helm-charts```

```helm repo update```

```helm install loki grafana/loki-distributed --values ./loki/values.yaml --set s3=s3://KEY_ID:ACCESS_KEY@BUCKET_REGION/BUCKET_NAME -n monitoring```

## Install Fluentd

```helm repo add fluent https://fluent.github.io/helm-charts -n monitoring```

```helm repo update```

```helm install fluentd fluent/fluentd --values ./fluentd/values.yaml -n monitoring```

## Install Log Generator App

```kubectl aplly -f ./logs-generator/deployment.yaml -n monitoring```

## Install Grafana

```helm install grafana grafana/grafana```

## Get Grafana Password

```kubectl get secret --namespace monitoring grafana -o jsonpath="{.data.admin-password}" | base64 --decode ; echo```

## Forward Services

```kubectl port-forward svc/grafana 3000:80```
```kubectl port-forward svc/loki-loki-distributed-gateway 3100:80```
