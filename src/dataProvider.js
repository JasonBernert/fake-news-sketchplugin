const sketch = require('sketch');
const { DataSupplier } = sketch;
const util = require('util');

export function onStartup () {
  DataSupplier.registerDataSupplier('public.text', 'Headline', 'RandomHeadline');
  // DataSupplier.registerDataSupplier('public.text', 'Subheadline', 'RandomSubheadline');
  DataSupplier.registerDataSupplier('public.text', 'Description', 'RandomDescription');
  DataSupplier.registerDataSupplier('public.text', 'Label', 'RandomLabel');
  DataSupplier.registerDataSupplier('public.text', 'Byline', 'RandomByline');
  DataSupplier.registerDataSupplier('public.text', 'Photo caption', 'RandomPhotoCaption');
  DataSupplier.registerDataSupplier('public.image', 'Lead image', 'RandomLeadImage');
  // DataSupplier.registerDataSupplier('public.image', 'Byline image', 'RandomBylineImage');
  // DataSupplier.registerDataSupplier('public.json', 'fakenews', 'SupplyData') // Available in Sketch 71+
}

const FOLDER = path.join(os.tmpdir(), 'com.sketchapp.unsplash-plugin')

export function onShutdown () {
  DataSupplier.deregisterDataSuppliers();
  try {
    if (fs.existsSync(FOLDER)) {
      fs.rmdirSync(FOLDER)
    }
  } catch (err) {
    console.error(err)
  }
}

// TODO: Higher-order function to return data supplier functions
// function createDataSupplier(contentElement) {
//   return (context) => {
//     let dataKey = context.data.key
//     const items = util.toArray(context.data.items).map(sketch.fromNative)
//     fetch("https://www.washingtonpost.com/arcio/most-read/")
//       .then(response => response.json())
//       .then(data => (
//         items.forEach((item, index) => {
//           const random20 = Math.floor(Math.random() * 20);
//           DataSupplier.supplyDataAtIndex(dataKey, data.content_elements[random20][contentElement], index)
//         })
//       ));
//   };
// }

// const onRandomHeadline = createDataSupplier("headlines.basic");
// export function onRandomHeadline(context);


export function onRandomHeadline (context) {
  let dataKey = context.data.key
  const items = util.toArray(context.data.items).map(sketch.fromNative)
  fetch("https://www.washingtonpost.com/arcio/most-read/")
    .then(response => response.json())
    .then(data => (
      items.forEach((item, index) => {
        const random20 = Math.floor(Math.random() * 20);
        DataSupplier.supplyDataAtIndex(dataKey, data.content_elements[random20].headlines.basic, index)
      })
    ));
}

export function onRandomDescription (context) {
  console.log(onRandomHeadline.toString())
  let dataKey = context.data.key
  const items = util.toArray(context.data.items).map(sketch.fromNative)
  fetch("https://www.washingtonpost.com/arcio/most-read/")
    .then(response => response.json())
    .then(data => (
      items.forEach((item, index) => {
        const random20 = Math.floor(Math.random() * 20);
        DataSupplier.supplyDataAtIndex(dataKey, data.content_elements[random20].description.basic, index)
      })
    ));
}

// NOTE: This rarely returns anything 
// export function onRandomSubheadline (context) {
//   let dataKey = context.data.key
//   const items = util.toArray(context.data.items).map(sketch.fromNative)
//   fetch("https://www.washingtonpost.com/arcio/most-read/")
//     .then(response => response.json())
//     .then(data => (
//       items.forEach((item, index) => {
//         const random20 = Math.floor(Math.random() * 20);
//         DataSupplier.supplyDataAtIndex(dataKey, data.content_elements[random20].subheadlines.basic, index)
//       })
//     ));
// }

export function onRandomLabel (context) {
  let dataKey = context.data.key
  const items = util.toArray(context.data.items).map(sketch.fromNative)
  fetch("https://www.washingtonpost.com/arcio/most-read/")
    .then(response => response.json())
    .then(data => (
      items.forEach((item, index) => {
        const random20 = Math.floor(Math.random() * 20);
        // TODO: "transparency" is another option beside "basic". Ex: "News" instead of "Business".
        DataSupplier.supplyDataAtIndex(dataKey, data.content_elements[random20].label.basic.text, index)
      })
    ));
}

export function onRandomByline (context) {
  let dataKey = context.data.key
  const items = util.toArray(context.data.items).map(sketch.fromNative)
  fetch("https://www.washingtonpost.com/arcio/most-read/")
    .then(response => response.json())
    .then(data => (
      items.forEach((item, index) => {
        const random20 = Math.floor(Math.random() * 20);
        // TODO: return all authors?
        DataSupplier.supplyDataAtIndex(dataKey, data.content_elements[random20].credits.by[0].name, index)
      })
    ));
}

export function onRandomPhotoCaption (context) {
  let dataKey = context.data.key
  const items = util.toArray(context.data.items).map(sketch.fromNative)
  fetch("https://www.washingtonpost.com/arcio/most-read/")
    .then(response => response.json())
    .then(data => (
      items.forEach((item, index) => {
        const random20 = Math.floor(Math.random() * 20);
        DataSupplier.supplyDataAtIndex(dataKey, data.content_elements[random20].promo_items.basic.caption, index)
      })
    ));
}
