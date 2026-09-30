with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

idx = content.index('reach me')
print(repr(content[idx:idx+30]))