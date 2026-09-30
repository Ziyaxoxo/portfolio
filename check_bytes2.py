with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

idx = content.index('reach me')
context = content[idx:idx+40]
for i, c in enumerate(context):
    if ord(c) < 32 or ord(c) > 126:
        print(f"Byte {i}: {ord(c)} char=[{c}]")