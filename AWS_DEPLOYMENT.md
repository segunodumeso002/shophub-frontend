# AWS Backend Deployment Guide (EC2)

## Option 1: EC2 (Recommended for Free Tier)

### Step 1: Launch EC2 Instance

1. **Go to EC2 Console:** https://console.aws.amazon.com/ec2
2. Click "Launch Instance"
3. **Configure:**
   - Name: `shophub-backend`
   - AMI: Ubuntu Server 22.04 LTS (Free tier eligible)
   - Instance type: `t2.micro` (Free tier)
   - Key pair: Create new → Download `.pem` file
   - Security group: Create new
     - Allow SSH (port 22) from your IP
     - Allow HTTP (port 80) from anywhere
     - Allow HTTPS (port 443) from anywhere
     - Allow Custom TCP (port 5000) from anywhere
4. Click "Launch instance"

### Step 2: Connect to EC2

**Windows (using PowerShell):**
```powershell
ssh -i "path\to\your-key.pem" ubuntu@your-ec2-public-ip
```

### Step 3: Setup Server

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Install PM2 (process manager)
sudo npm install -g pm2

# Verify installations
node --version
npm --version
psql --version
```

### Step 4: Setup PostgreSQL

```bash
# Switch to postgres user
sudo -u postgres psql

# In PostgreSQL prompt:
CREATE DATABASE ecommerce_db;
CREATE USER shophub WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE ecommerce_db TO shophub;
\q
```

### Step 5: Upload Your Code

**Option A: Using Git (Recommended)**
```bash
# On EC2
cd /home/ubuntu
git clone https://github.com/YOUR_USERNAME/shophub-ecommerce.git
cd shophub-ecommerce/server
npm install
```

**Option B: Using SCP (from your PC)**
```powershell
scp -i "your-key.pem" -r c:\Users\SCHOOL\Desktop\Self_Learning_React\tutorial003-react\server ubuntu@your-ec2-ip:/home/ubuntu/
```

### Step 6: Setup Database Schema

```bash
cd /home/ubuntu/shophub-ecommerce/server
psql -U shophub -d ecommerce_db -f database-schema.sql
psql -U shophub -d ecommerce_db -f sample-products.sql
```

### Step 7: Configure Environment

```bash
cd /home/ubuntu/shophub-ecommerce/server
nano .env
```

Paste:
```env
DATABASE_URL=postgresql://shophub:your_secure_password@localhost:5432/ecommerce_db
JWT_SECRET=your_super_secret_jwt_key_change_this
PORT=5000
NODE_ENV=production

AWS_REGION=us-east-2
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_S3_BUCKET=shophub-products

STRIPE_SECRET_KEY=sk_test_your_stripe_key

SES_FROM_EMAIL=andrew.tierney@akocapitals.com

FRONTEND_URL=https://your-netlify-site.netlify.app
```

Save: `Ctrl+X`, `Y`, `Enter`

### Step 8: Start Backend with PM2

```bash
cd /home/ubuntu/shophub-ecommerce/server
pm2 start src/index.js --name shophub-api
pm2 save
pm2 startup
```

### Step 9: Setup Nginx (Reverse Proxy)

```bash
# Install Nginx
sudo apt install -y nginx

# Create config
sudo nano /etc/nginx/sites-available/shophub
```

Paste:
```nginx
server {
    listen 80;
    server_name your-ec2-public-ip;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/shophub /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 10: Test Backend

```bash
curl http://your-ec2-public-ip/api/health
```

Should return: `{"status":"ok"}`

### Step 11: Update Netlify

1. Go to Netlify dashboard
2. Site settings → Environment variables
3. Update `VITE_API_URL` to: `http://your-ec2-public-ip/api`
4. Trigger new deploy

## SSL Certificate (Optional but Recommended)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get certificate (requires domain name)
sudo certbot --nginx -d yourdomain.com
```

## Useful PM2 Commands

```bash
pm2 status              # Check status
pm2 logs shophub-api    # View logs
pm2 restart shophub-api # Restart
pm2 stop shophub-api    # Stop
pm2 delete shophub-api  # Remove
```

## Updating Your Code

```bash
cd /home/ubuntu/shophub-ecommerce
git pull origin main
cd server
npm install
pm2 restart shophub-api
```

## Security Checklist

- [ ] Change default PostgreSQL password
- [ ] Use strong JWT_SECRET
- [ ] Restrict EC2 security group (SSH only from your IP)
- [ ] Setup SSL certificate
- [ ] Enable AWS CloudWatch for monitoring
- [ ] Setup automated backups for database

## Cost Estimate

**Free Tier (12 months):**
- EC2 t2.micro: 750 hours/month (FREE)
- After free tier: ~$8-10/month

## Troubleshooting

### Can't connect to EC2
- Check security group allows port 22
- Verify key file permissions: `chmod 400 your-key.pem`

### Backend not starting
- Check logs: `pm2 logs shophub-api`
- Verify .env file exists
- Check PostgreSQL is running: `sudo systemctl status postgresql`

### Database connection error
- Verify DATABASE_URL in .env
- Check PostgreSQL allows local connections

## Your Backend Info

After deployment, save:
- **Backend URL:** `http://your-ec2-public-ip/api`
- **EC2 Public IP:** (from AWS console)
- **SSH Command:** `ssh -i your-key.pem ubuntu@your-ip`
