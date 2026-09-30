with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the right double quotation mark (U+201D) after "reach me" with nothing
content = content.replace('reach me\u201d', 'reach me.')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
print('Done')