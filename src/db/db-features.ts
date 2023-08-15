import {
  FilterQuery,
  Model,
  ProjectionType,
  QueryOptions,
  UpdateQuery,
} from "mongoose";
import { dbResponseTimeHistogram } from "../utils/metrics-server.utils";

export const create = async <T>(model: Model<T>, doc: Partial<T>) => {
  const metricsLabels = {
    operation: `create ${model.modelName} Model`,
  };
  const timer = dbResponseTimeHistogram.startTimer();

  try {
    const document = await model.create(doc);
    timer({ ...metricsLabels, success: "true" });
    return document.toJSON();
  } catch (err: any) {
    timer({ ...metricsLabels, success: "false" });
    throw err;
  }
};

export const findOne = async <T>(
  model: Model<T>,
  filterQuery: FilterQuery<T>,
  projection?: ProjectionType<T>,
  options?: QueryOptions<T>
) => {
  const metricsLabels = {
    operation: `findOne ${model.modelName} Model`,
  };
  const timer = dbResponseTimeHistogram.startTimer();

  try {
    const doucumet = await model
      .findOne(filterQuery, projection, options)
      .exec();
    if (!doucumet) {
      timer({ ...metricsLabels, success: "false" });
    } else {
      timer({ ...metricsLabels, success: "true" });
    }

    return doucumet;
  } catch (err) {
    timer({ ...metricsLabels, success: "false" });
    throw err;
  }
};

export const findAll = async <T>(
  model: Model<T>,
  filterQuery: FilterQuery<T>,
  projection?: ProjectionType<T>,
  options?: QueryOptions<T>
) => {
  const metricsLabels = {
    operation: `findAll ${model.modelName} Model`,
  };
  const timer = dbResponseTimeHistogram.startTimer();

  try {
    const documents = await model
      .find(filterQuery, projection, {
        lean: true,
        sort: "-createdAt",
        ...(options && options),
      })
      .exec();
    timer({ ...metricsLabels, success: "true" });
    return documents;
  } catch (err) {
    timer({ ...metricsLabels, success: "false" });
    throw err;
  }
};

export const findOneAndUpdate = async <T>(
  model: Model<T>,
  filterQuery: FilterQuery<T>,
  update?: UpdateQuery<T>
) => {
  const metricsLabels = {
    operation: `findOneAndUpdate ${model.modelName} Model`,
  };
  const timer = dbResponseTimeHistogram.startTimer();
  try {
    const document = await model
      .findOneAndUpdate(filterQuery, update, {
        lean: true,
        new: true,
        runValidators: true,
      })
      .exec();

    if (!document) {
      timer({ ...metricsLabels, success: "false" });
    } else {
      timer({ ...metricsLabels, success: "true" });
    }

    return document;
  } catch (err) {
    timer({ ...metricsLabels, success: "false" });
    throw err;
  }
};

export const deleteOne = async <T>(
  model: Model<T>,
  filterQuery: FilterQuery<T>
) => {
  const metricsLabels = {
    operation: `DeleteOne ${model.modelName} Model`,
  };
  const timer = dbResponseTimeHistogram.startTimer();
  try {
    const result = await model.deleteOne(filterQuery);

    if (result.deletedCount == 0) {
      timer({ ...metricsLabels, success: "false" });
    } else {
      timer({ ...metricsLabels, success: "true" });
    }
    return result.deletedCount >= 1;
  } catch (err) {
    timer({ ...metricsLabels, success: "false" });
    throw err;
  }
};

export const updateOne = async <T>(
  model: Model<T>,
  filterQuery: FilterQuery<T>,
  update?: UpdateQuery<T>,
  options?: QueryOptions<T>
) => {
  const metricsLabels = {
    operation: `Update ${model.modelName} Model`,
  };
  const timer = dbResponseTimeHistogram.startTimer();
  try {
    const result = await model.updateOne(filterQuery, update, {
      runValidators: true,
      lean: true,
      ...(options && options),
    });

    if (result.modifiedCount == 0) {
      timer({ ...metricsLabels, success: "false" });
    } else {
      timer({
        ...metricsLabels,
        success: "true",
      });
    }
    return result.modifiedCount >= 1;
  } catch (err) {
    timer({
      ...metricsLabels,
      success: "false",
    });
    throw err;
  }
};
